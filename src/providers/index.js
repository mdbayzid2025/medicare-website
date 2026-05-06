import { ThemeProvider } from "context/ThemeContext"

const Providers = ({children}) =>{
    return (
        <ThemeProvider>
        {/* <AuthProvider> */}
        {/* <AuthContextProvider> */}
        {children}
        {/* </AuthContextProvider> */}
        {/* </AuthProvider> */}
        </ThemeProvider>
    )
}

export default  Providers