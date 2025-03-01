import Landing from "../pages/Landing";
import Evenement from "../pages/Evenement";
import Prestataire from "../pages/Prestataire";
import Service from "../pages/service";
import Billets from "../pages/Billets";
import Contact from "../pages/Contact";

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