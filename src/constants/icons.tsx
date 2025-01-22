const IconClose = (props: { onClick?: () => void; className?: string }) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		onClick={props.onClick}
		className={props.className}
	>
		<path
			d="M7 7L17 17"
			stroke="#363A3D"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M7 17L17 7"
			stroke="#363A3D"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

const IconArrawPrev = (props: { onClick?: () => void; className?: string }) => (
	<svg
		className={props.className}
		onClick={props.onClick}
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M11.7803 3.96967C12.0732 4.26256 12.0732 4.73744 11.7803 5.03033L7.81066 9L11.7803 12.9697C12.0732 13.2626 12.0732 13.7374 11.7803 14.0303C11.4874 14.3232 11.0126 14.3232 10.7197 14.0303L6.21967 9.53033C5.92678 9.23744 5.92678 8.76256 6.21967 8.46967L10.7197 3.96967C11.0126 3.67678 11.4874 3.67678 11.7803 3.96967Z"
			// fill="#252525"
		/>
	</svg>
);

const IconArrawNext = (props: { onClick?: () => void; className?: string }) => (
	<svg
		className={props.className}
		onClick={props.onClick}
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M6.21967 3.96967C6.51256 3.67678 6.98744 3.67678 7.28033 3.96967L11.7803 8.46967C12.0732 8.76256 12.0732 9.23744 11.7803 9.53033L7.28033 14.0303C6.98744 14.3232 6.51256 14.3232 6.21967 14.0303C5.92678 13.7374 5.92678 13.2626 6.21967 12.9697L10.1893 9L6.21967 5.03033C5.92678 4.73744 5.92678 4.26256 6.21967 3.96967Z"
			// fill="#252525"
		/>
	</svg>
);

export { IconClose, IconArrawPrev, IconArrawNext };
