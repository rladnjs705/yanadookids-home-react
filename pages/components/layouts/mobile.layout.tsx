import Navbar from '../NavBar'
import Footer from '../Footer'

export default function Mobile_Layout({ children } : {children: JSX.Element}) {
    return (
        <>
            모바일
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}