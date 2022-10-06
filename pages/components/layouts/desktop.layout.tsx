import Navbar from '../NavBar'
import Footer from '../Footer'

export default function Desktop_Layout({ children } : {children: JSX.Element}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}