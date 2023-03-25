
const chainDataProvider = 'https://www.oklink.com/okc-test/tokenAddr'

interface CoinChartsProps {
  contractAddress: string | undefined | null
}

export const HolderChart = ({contractAddress}:CoinChartsProps) => {

  return (
    <div className="flex justify-center mt-8 text-center">
      <a href={`${chainDataProvider}/${contractAddress}`} target="_blank" rel="noreferrer"
        className="text-gray-700 underline text-sm">
      Here shows the validated metrics on OKLINK Explore
      </a>
    </div> 
  )

}

export const TransferChart = ({contractAddress}:CoinChartsProps) => {
  return  (
    <iframe
    src={`${chainDataProvider}/${contractAddress}`}
    className="w-full lg:max-w-5xl"
    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
  />
  ) 

}