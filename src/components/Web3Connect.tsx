import { useState } from 'react';
import localForage from 'localforage'
import { FaSpinner } from 'react-icons/fa';
import { useAppDispatch } from '../redux/hooks';
import { updateConnectSuccess } from '../redux/isConnectedSlice';
import { setFounderProfile } from '../redux/founderProfileSlice';
import { createFounderByGraphQL } from '../utils/createData';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { IInternalEvent } from "@walletconnect/types";
import { IAssetData } from "./types";

/**
 * Desktop User 使用 Metamask Signup
 * Mobile User 使用 Walletconnect Signup
 * 成功後, 把User的address傳給後端處理
 * 後端會傳回User Profile (including hd data&parameters) 給前端render (要在redux 新增 isConnected state)
 * ToDo(Luke): 處理 errorMsg, 可用pop up 顯示
 */

interface IAppState {
  connector: WalletConnect | null;
  fetching: boolean;
  connected: boolean;
  chainId: number;
  showModal: boolean;
  pendingRequest: boolean;
  uri: string;
  accounts: string[];
  address: string;
  result: any | null;
  assets: IAssetData[];
}

const INITIAL_STATE: IAppState = {
  connector: null,
  fetching: false,
  connected: false,
  chainId: 1,
  showModal: false,
  pendingRequest: false,
  uri: "",
  accounts: [],
  address: "",
  result: null,
  assets: [],
};

interface GETSTARTED_PROPS{
  text:string,
}

const Web3Connect = ({text}:GETSTARTED_PROPS) => {
  
  const dispatch = useAppDispatch()
  const [connectStates, setConnectStates] = useState(INITIAL_STATE)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const writeItemToStorage = async (newValue:string) => {
    await localForage.setItem('@account_address', newValue)
  };
  
  async function metaMaskConnect(): Promise<any>{
    async function getMetamaskAddress():Promise<string | undefined>{
      let address;
      await window.ethereum.request({method: 'eth_requestAccounts'}).then((accounts:string[]) => {
        address = accounts[0];
      }).catch((err:any) => {
        console.log(err)
      });
      return address;
    }
  
    async function getMetamaskBalance(address:string | undefined){
      let balance;
      await window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']}).then( (result:any) => {
        let wei = parseInt(result, 16);
        balance = wei / (10**18) + " Eth";
      }).catch((err:any) => {
        console.log(err)
      })
      return balance;
    }
    if (window.ethereum) {
      let address = await getMetamaskAddress();
      let balance = await getMetamaskBalance(address);
      if(address!==undefined && balance!==undefined){
        writeItemToStorage(address)  //(TODO: Luke) 先用地址, 之後要做一個亂數處理, e.g. has-256, 
        return {address, balance}
      }else{
        return false
      }
    }else{
      return false
    }
  }


  async function getFounderConnected(address:string){
    // if user never connected before, then backend will create a new profile for him/her, and return the profile
    console.log('founder address: ', address)
    let result = await createFounderByGraphQL(address)
    .then(res => {
      console.log('sucessfully connected into CryptoFounders server!')
      return res
    })
    .catch( err => {
      setIsLoading(false)
      setErrorMsg(`connection failed, error msg: ${err}`)
      return false
    })
    
    if(result){
      dispatch(setFounderProfile(result))
      dispatch(updateConnectSuccess())
    }
  }

  const walletConnect = async () => {
    // bridge url
    const bridge = "https://bridge.walletconnect.org";
    // create new connector
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

    setConnectStates({...connectStates, connector }); // typescript 在使用 setState時, 必須包含所有keys, 不支援partial key 寫法

    // if not connected, need to create session to listen
    if (!connector.connected) {
      // create new session
      await connector.createSession();
      // subscribe to events, listening if successully connect to metamask or other wallets
      subscribeToEvents(connector);
    }else{
      // if connected, then go for that directly
      const { chainId, accounts } = connector;
      const address = accounts[0]; //take the first accounts. TODO(Luke):應該要給user選, 或是更適合的方法來決定哪個account
      setConnectStates({...connectStates, chainId, accounts, address});
      writeItemToStorage(address) //紀錄原始address, 不分大小寫.  比較時, 在比較函數裡都轉成小寫.
      await getFounderConnected(address) //用原始address, 不分大小寫.  backend用時, 再轉成小寫.
    }

  };

  const subscribeToEvents = (connector: WalletConnect) => {
    //如果 connector 不存在, 則直接return
    if (!connector) return;

    connector.on("connect", async (error, payload) => onConnect(error, payload));
    connector.on("session_update", async (error, payload) => onSessionUpdate(error, payload));
    connector.on("disconnect", (error) => onDisconnect(error));
  };

  const onConnect = async (error:any, payload:IInternalEvent) => {

    console.log(`connector.on("connect")`);
    
    if (error) throw error;

    const { chainId, accounts } = payload.params[0];
    const address = accounts[0]; //take the first accounts. TODO(Luke):應該要給user選, 或是更適合的方法來決定哪個account

    setConnectStates({...connectStates, connected: true, chainId, accounts, address });
    writeItemToStorage(address)
    await getFounderConnected(address) //用原始address, 不分大小寫.  backend用時, 再轉成小寫.

  };

  const onSessionUpdate = async (error:any, payload: IInternalEvent) => {

    console.log(`connector.on("session_update")`);

    if (error) throw error;

    const { chainId, accounts } = payload.params[0];
    const address = accounts[0];

    setConnectStates({...connectStates, chainId, accounts, address });
    writeItemToStorage(address)
    await getFounderConnected(address) //用原始address, 不分大小寫.  backend用時, 再轉成小寫.
  };

  const onDisconnect = async (error:any) => {
    console.log(`connector.on("disconnect")`);
    if (error) {
      throw error;
    }
    setConnectStates({ ...INITIAL_STATE });
  };

  async function handleOnClick(){
    
    setIsLoading(true);
    setErrorMsg(''); //每次點擊都要清空錯誤訊息
    if(window.ethereum){
      // Desktop chrome 有 metamask extension 的情況
      let {address, balance} = await metaMaskConnect();
      if(address!==undefined){
        setConnectStates({...connectStates, address}) //要等到函數完畢才會更新
        await getFounderConnected(address) //用原始address, 不分大小寫.  backend用時, 再轉成小寫.
      }
    }else{
      //Mobile browser, 沒有 metamask extension的情況, 則使用 wallet connect;
      console.log('i am using walletConnect')
      await walletConnect()
    }

    setIsLoading(false)
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='mt-20 mb-4 mx-16 bg-brand p-4 text-center text-white text-lg font-bold rounded-xl cursor-pointer'>
        <button
          onClick={handleOnClick}
          >
          {isLoading ? (<FaSpinner className='animate-spin'/>) : (<p>{text}</p>)}
        </button>
      </div>
      <div className='text-red-500 text-xs'>{errorMsg}</div>
    </div>
  )
}

export default Web3Connect