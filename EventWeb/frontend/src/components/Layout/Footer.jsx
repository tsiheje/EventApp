const Footer = () => {
    return(
        <div className="flex flex-col">
            <div className="flex items-center justify-center bg-gray-700 p-5">
                <p className="text-xl text-white font-bold">TikeHetsika - Gestion d'Événements & Billetterie</p>
                <div className="flex flex-col gap-2">
                    <a href="/about" className="text-sm text-white hover:underline">À propos</a>
                    <a href="/terms" className="text-sm text-white hover:underline">Conditions d'utilisation</a>
                    <a href="/privacy" className="text-sm text-white hover:underline">Politique de confidentialité</a>
                    <a href="/Contacts" className="text-sm text-white hover:underline">Contact</a>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-800 p-6">
                <p className="text-sm text-white">
                    copyright &copy; {new Date().getFullYear()} <a href="https://marie-mickaelio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline">par Mickaelio</a>. Tous droits réservés !
                </p>
            </div>
        </div>
    )
}

export default Footer;
