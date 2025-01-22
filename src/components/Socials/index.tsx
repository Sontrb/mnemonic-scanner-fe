import { DiscordOutlined, GlobalOutlined, MediumOutlined, SendOutlined, TwitterOutlined } from "@ant-design/icons";
import Link from "next/link";

const Socials = ({
	website,
	telegram,
	medium,
	discord,
	twitter,
	className,
	classIcons,
}: {
	website?: string;
	telegram?: string;
	medium?: string;
	discord?: string;
	twitter?: string;
	className?: string;
	classIcons?: string;
}) => (
	<ul className={"flex gap-1 sm:gap-3 items-center justify-center " + className}>
		{website && (
			<li>
				<Link
					href={website || "#"}
					target="_blank"
				>
					{" "}
					<GlobalOutlined className={classIcons} />
				</Link>
			</li>
		)}
		{telegram && (
			<li>
				<Link
					href={telegram || "#"}
					target="_blank"
				>
					<SendOutlined className={classIcons} />
				</Link>
			</li>
		)}
		{medium && (
			<li>
				<Link
					href={medium || "#"}
					target="_blank"
				>
					<MediumOutlined className={classIcons}  />
				</Link>
			</li>
		)}
		{discord && (
			<li>
				<Link
					href={discord || "#"}
					target="_blank"
				>
					<DiscordOutlined className={classIcons} />
				</Link>
			</li>
		)}
		{twitter && (
			<li>
				<Link
					href={twitter || "#"}
					target="_blank"
				>
					<TwitterOutlined className={classIcons} />
				</Link>
			</li>
		)}
	</ul>
);

export default Socials;
