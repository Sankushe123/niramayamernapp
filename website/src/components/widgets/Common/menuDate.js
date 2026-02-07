import Link from "next/link";

// Slugify function to convert names to URL-safe strings
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const ServicesDropdown = ({ showServices, setShowServices, servicesMenu }) => {
  if (!showServices) return null;

  // console.log("servicesMenu", servicesMenu);

  return (
    <div className="mt-2 w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 sm:p-6 z-50 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto">
        {servicesMenu
          .filter((data) => data.subLinks && data.subLinks.length > 0)
          .map((data) => (
            <div key={data.title}>
              <span className="font-semibold text-sm text-pink-600">
                {data.title}
              </span>
              <div className="mt-2 space-y-1">
                {data.subLinks.map((link) => (
                  <Link
                    key={link.slug}
                    href={`/mother-child-care/services${link.slug}`}
                    className="block text-gray-700 text-sm hover:text-blue-500"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServicesDropdown;
