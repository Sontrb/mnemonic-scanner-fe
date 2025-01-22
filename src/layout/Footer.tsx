import Image from "next/image";
import Link from "next/link";

const Footer = () => (
	<footer className=" w-full flex justify-center bg-black">
		<div className="container mx-auto px-4 py-6 sm:(py-15 px-0)">
			<div className="py-6 border-b-1 border-surface-border">
				<Link href={"#"}>
					<Image
						src={"/images/logo.svg"}
						alt="uniultra"
						width={100}
						height={44}
						className="hidden sm:block"
					/>
					<Image
						src={"/images/logo-mobile.png"}
						alt="uniultra"
						width={19}
						height={28}
						className="block sm:hidden"
					/>
				</Link>
			</div>
			<div className="pt-6 flex flex-col text-center sm:(justify-between text-leftflex-row)">
				<p className="font-normal text-xs text-txt-tertiary">© Mnemonic Scanner.</p>
				<ul className="flex mt-4 justify-center flex-row gap-6 sm:(mt-0)font-normal text-xs text-txt-tertiary">
					<li>
						<Link href="#">Terms of Service</Link>
					</li>
					<li>
						<Link href="#">Privacy Policy</Link>
					</li>
					<li>
						<Link href="#">Cookies</Link>
					</li>
				</ul>
			</div>
		</div>
	</footer>
);

export default Footer;
