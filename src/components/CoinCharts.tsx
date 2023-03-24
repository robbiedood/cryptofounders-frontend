
const chainDataProvider = 'https://goerli.etherscan.io'

interface CoinChartsProps {
  contractAddress: string | undefined | null
}

export const HolderChart = ({contractAddress}:CoinChartsProps) => {

  return (
    <div className="flex justify-center mt-8 text-center">
      <a href={`${chainDataProvider}/token/tokenholderchart/${contractAddress}#balances`} target="_blank" rel="noreferrer"
        className="text-gray-700 underline text-sm">
      Here shows the validated metrics on Etherscan.io
      </a>
    </div> 
  )

}

export const TransferChart = ({contractAddress}:CoinChartsProps) => {
  return  (
    <iframe
    src={`${chainDataProvider}/token/${contractAddress}`}
    className="w-full lg:max-w-5xl"
    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
  />
  ) 

}