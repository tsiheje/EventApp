const Footer = () => {
    return(
        <div className="flex flex-col">
            <div className="flex items-center justify-center bg-gray-700 p-5">
                <p>Evenement</p>
            </div>
            <div className="flex items-center justify-center bg-gray-800">
                <p className="text-sm mb-2 text-white p-5">
                    copyright &copy; {new Date().getFullYear()} <a href="https://marie-mickaelio.vercel.app" target="blank">par Mickaelio</a>. tous droit réserver!
                </p>
            </div>
        </div>
    )
}

export default Footer;