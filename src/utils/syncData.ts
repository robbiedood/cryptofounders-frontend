// fetch founder profile from backend whenever a critical step being taken in frontend, e.g. connect, found, make offer, etc.
import { getFounderByGraphQL } from './getData'
import { useAppDispatch } from '../redux/hooks'
import { setFounderProfile } from "../redux/founderProfileSlice";

// sync founder profile from backend with local redux store
// requre dispatch in argu because hook can only be declared in a functional "component"
export async function syncFounderData(accountAddress:string, dispatch: ReturnType<typeof useAppDispatch>) {
  try {
    const founder = await getFounderByGraphQL({accountAddress})
    console.log('accountAddress', accountAddress)
    dispatch(setFounderProfile(founder))
    return true
  } catch (error) {
    console.log(error)
    return error
  }
}
