'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get("category");
  const rawSubcategory = searchParams.get("subcategory");

  let category = rawCategory;
  let subcategory = rawSubcategory;

  if (rawCategory && rawCategory.includes("?subcategory=")) {
    const parts = rawCategory.split("?subcategory=");
    category = parts[0];
    subcategory = parts[1];
  }

  const pathSegments = pathname.split('/').filter(Boolean);

  // Build all crumbs: path segments + category + subcategory
  const allCrumbs = pathSegments.map((segment, index) => ({
    key: '/' + pathSegments.slice(0, index + 1).join('/'),
    label: decodeURIComponent(segment),
    href: '/' + pathSegments.slice(0, index + 1).join('/'),
    isLink: index !== pathSegments.length - 1 || !category && !subcategory, // If no category/subcategory, last path segment is tail
  }));

  if (category) {
    allCrumbs.push({
      key: 'category',
      label: decodeURIComponent(category),
      href: null,
      isLink: false,
    });
  }

  if (subcategory) {
    allCrumbs.push({
      key: 'subcategory',
      label: decodeURIComponent(subcategory),
      href: null,
      isLink: false,
    });
  }

  // The tail is the last crumb in allCrumbs
  const lastIndex = allCrumbs.length - 1;

  return (
    <nav aria-label="Breadcrumb" className="my-4 px-3 sm:px-6 lg:px-12 overflow-x-auto">
      <ol className="flex flex-nowrap items-center space-x-0 sm:space-x-1">
        <li className="flex items-center text-xs sm:text-sm">
          <Link
            href="/"
            className={`text-gray-500 hover:text-gray-600 hover:font-normal truncate max-w-[80px] sm:max-w-[120px] block`}
            title="Home"
          >
            Home
          </Link>
        </li>

        {allCrumbs.map(({ key, label, href, isLink }, i) => (
          <li key={key} className="flex items-center text-xs sm:text-sm">
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 text-gray-400 shrink-0" />
            {i === lastIndex ? (
              <span
                className="text-pink-600 font-medium capitalize truncate max-w-[120px] sm:max-w-[200px] block"
                title={label}
              >
                {label}
              </span>
            ) : isLink && href ? (
              <Link
                href={href}
                className="text-gray-500 hover:text-gray-600 hover:font-normal capitalize truncate max-w-[120px] sm:max-w-[200px] block"
                title={label}
              >
                {label}
              </Link>
            ) : (
              <span
                className="text-gray-500 capitalize truncate max-w-[120px] sm:max-w-[200px] block"
                title={label}
              >
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
