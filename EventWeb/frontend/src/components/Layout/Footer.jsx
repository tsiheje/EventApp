import { Facebook,Mail, FileText, ShieldCheck, Info, PhoneCall } from "lucide-react";

const Footer = () => {
    return (
        <footer className="flex flex-col bg-gray-800 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-20 py-6">
                <div>
                    TikeHetsika
                </div>
                <div className="flex flex-col gap-5">
                    <a href="/about" className="flex items-center gap-2 text-sm hover:text-gray-300 transition">
                        <Info size={16} /> À propos
                    </a>
                    <a href="/terms" className="flex items-center gap-2 text-sm hover:text-gray-300 transition">
                        <FileText size={16} /> Conditions d'utilisation
                    </a>
                    <a href="/privacy" className="flex items-center gap-2 text-sm hover:text-gray-300 transition">
                        <ShieldCheck size={16} /> Politique de confidentialité
                    </a>
                    <a href="/contacts" className="flex items-center gap-2 text-sm hover:text-gray-300 transition">
                        <Mail size={16} /> Contact-nous
                    </a>
                </div>
                <div className="flex flex-col justify-center gap-6 py-4">
                    <p className="text-2xl">Contact</p>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-gray-400 transition">
                        <Facebook size={20} /> TikeHetsika
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-gray-400 transition">
                        <Mail size={20} /> tsihejem@gmail.com
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-gray-400 transition">
                        <PhoneCall size={20} /> +261 34 23 415 66
                    </a>
                </div>
            </div>
            <div className="text-center text-sm bg-gray-900 p-6">
                <p>
                    &copy; {new Date().getFullYear()} <a href="https://marie-mickaelio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        Mickaelio
                    </a>. Tous droits réservés !
                </p>
            </div>
        </footer>
    );
};

export default Footer;
