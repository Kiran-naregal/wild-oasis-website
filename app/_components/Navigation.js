import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex gap-3 items-center"
          >
            <img src={session.user.image} alt="user avatar" className="rounded-full h-8" referrerPolicy="no-referrer" />
            Guest area
          </Link> :
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          }
        </li>
      </ul>
    </nav>
  );
}
