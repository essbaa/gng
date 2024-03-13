import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center md:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={118}
            height={28}
          />
        </Link>
        <p>2024 Game Night Guild. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
