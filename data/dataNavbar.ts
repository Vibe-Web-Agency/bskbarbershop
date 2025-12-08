export interface NavbarDropdownItem {
  label: string;
  href: string;
}

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarData {
  brand: {
    name: string;
    logo: string | null;
    href: string;
  };
  links: NavbarLink[];
  cta: {
    label: string;
    href: string;
  };
}

export const navbarData: NavbarData = {
  brand: {
    name: "BSK Barbershop",
    logo: null,
    href: "/",
  },

  links: [
    {
      label: "Prestations",
      href: "/prestations",
    },

    {
      label: "Locks & Tresses",
      href: "/locks-tresses", // page spéciale sur demande
    },

    {
      label: "Galerie",
      href: "/galerie",
    },

    {
      label: "À propos",
      href: "/a-propos",
    },

    {
      label: "Contact",
      href: "/contact",
    },
  ],

  cta: {
    label: "Réserver",
    href: "/reserver",
  },
};
