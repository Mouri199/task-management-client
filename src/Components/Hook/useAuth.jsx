import { useContext } from "react"
import { AuthProvider } from "../AuthContributor/AuthContributor"

const useAuth = () => {
    const auth = useContext(AuthProvider)
    return auth
}
export default useAuth