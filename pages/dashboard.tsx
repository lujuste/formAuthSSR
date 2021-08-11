import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { setupAuthClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../Utils/withSSRAuth"

export default function Dashboard() {

    const { user } = useContext(AuthContext)

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
    }, [])


    return (
        <h1>Dashboard, área privada!, {user?.email}</h1>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAuthClient(ctx)
    const response = await apiClient.get('/me')
    console.log(response.data)
    return {
        props: {}
    }
})