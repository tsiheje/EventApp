import Landing from "../pages/Home/Landing";
import Evenement from "../pages/Evenement/Evenement";
import Prestataire from "../pages/Prestataire/Prestataire";
import Service from "../pages/Service/service";
import Billets from "../pages/Billets/Billets";
import Contact from "../pages/Contact/Contact";

const routes = [
    {
        path: "/",
        name: "Landing",
        Element: Landing,
    },
    {
        path: "/evenement",
        name: "Evenement",
        Element: Evenement,
    },
    {
        path: "/prestataire",
        name: "Prestataire",
        Element: Prestataire,
    },
    {
        path: "/service",
        name: "Service",
        Element: Service,
    },
    {
        path: "/billets",
        name: "Billets",
        Element: Billets,
    },
    {
        path: "/contacts",
        name: "Contacts",
        Element: Contact
    },
];

export default routes;