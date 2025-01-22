import {
	ENV,
	InternalTxType,
	TxType,
	// getListChain
} from "@/constants";
import store from "@/redux";
import { detect } from "detect-browser";
import moment from "moment";
import numeral from "numeral";

export const appConfig = {
	formatDateTime: "Do MMM YYYY",
	formatTime: "Do MMM YYYY HH:mm:ss",
	formatDateTimeFull: "MM/DD/YYYY - HH:mm:ss ",
};

export const formatNumber = (number: number) => {
	return Intl.NumberFormat("en-US").format(number);
};

export const formatDate = (time: any, format: string) => {
	if (!time) return "";
	// @ts-ignore
	const d = new moment.unix(time);
	return d.format(format ?? appConfig.formatDateTime);
};
export const formatDatetime = (time: any) => {
	if (!time) return "";
	// @ts-ignore
	const d = new moment.unix(time);
	return d.format(appConfig.formatTime);
};
export const getTime = (value: any) => {
	// @ts-ignore
	const time = new moment.unix(value);
	return time.startOf("minute").fromNow();
};

export const stringify: typeof JSON.stringify = (value, replacer, space) =>
	JSON.stringify(
		value,
		(key, value_) => {
			const value = typeof value_ === "bigint" ? value_.toString() : value_;
			return typeof replacer === "function" ? replacer(key, value) : value;
		},
		space,
	);

export const ellipsisAddress = (walletId: string | any, length?: number) => {
	const len = length || 5;
	return walletId
		? walletId.substring(0, len) + "..." + walletId.substring(walletId.length - len, walletId.length)
		: "";
};

// export const isInListChain = (chainId: number) => getListChain().map((e) => e.id).includes(chainId);

export const checkDecimals = (num: number, decimals: number) => {
	const numArr = num.toString().split(".");
	const lengthDecimal = numArr[1]?.length || 0;
	return lengthDecimal === decimals;
};

function formatStringWithTrimZero(inputString: string, decimalPlaces = 8) {
	const parts = inputString.split(".");
	const integerPart = parts[0];
	let decimalPart = parts[1] || "";

	while (decimalPart.endsWith("0")) {
		decimalPart = decimalPart.slice(0, -1);
	}

	const formattedDecimalPart = decimalPart ? `.${decimalPart}` : "";

	return `${integerPart}${formattedDecimalPart}`;
}

export function formatCurrency(numn: number | string, decimal = 8) {
	const num = Number(numn);
	const decimals = num >= 1 ? 2 : decimal;
	const newNumber = checkDecimals(Number(num), decimals)
		? num
		: Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
	if (num < 1 / Math.pow(10, decimals) && num > 0) {
		return `~${(1 / Math.pow(10, decimals)).toFixed(decimals)}`;
	}
	if (num < 1) {
		return formatStringWithTrimZero(newNumber.toFixed(decimals));
	}
	const formattedNumber = numeral(newNumber).format(cutLastCharacters(decimals));
	return formatStringWithTrimZero(formattedNumber);
}

function cutLastCharacters(decimal: number) {
	return "0,0.000000000000000000".slice(0, decimal - 18);
}

export const formattedDate = (value: number) => moment(value * 1000).format("HH:mm - D MMM, YYYY");

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // m

export function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function calculateTotalPages(totalRecords: number, pageSize: number) {
	return Math.ceil(totalRecords / pageSize);
}

export function formatTimestamp(createdTime: number) {
	const timestamp = moment.unix(createdTime);
	return timestamp.fromNow();
}

export function formatTimeWithFull(createdTime: number) {
	const formatted = moment.unix(createdTime).format("MMM-DD-YYYY hh:mm:ss A Z");
	return formatted;
}
export const formattedDateFull = (value: number) => moment(value).format(appConfig.formatDateTimeFull);

export const getTypeTransaction = (isInternal: boolean, type: number) => {
	if (isInternal) {
		return InternalTxType[type];
	}
	return TxType[type];
};

export const isInListChain = (chainId: number) => {
	// @ts-ignore
	const savedChainId = store.getState().system.selectedUserChainId;
	return savedChainId === chainId;
};

export const enforcer = (nextUserInput: string, onUserInput: (input: string) => void) => {
	if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
		onUserInput(nextUserInput);
	}
};

export const openNewTab = (url?: string) => {
	if (url && window !== undefined) {
		window.open(url, "_blank")?.focus();
	}
};

export function getKeyByValue(object: any, value: any) {
	return Object.keys(object as any).find((key) => object?.[key] === value);
}

export const getLinkTransaction = (hash: string, linkScan: string) => {
	const link = linkScan + "/tx/" + hash;
	return link;
};

const capitalizeStr = (str: string) => str[0].toUpperCase() + str.slice(1);
export const maxLengthMsg = (num: number) => `Max length ${num} characters!`;
export const getPlaceholderInput = (field: string) => `Enter ${field?.toLowerCase()}`;
export const getPlaceholderSelect = (field: string) => `Select ${field?.toLowerCase()}`;
export const getMaxlengthMsg = (num: number) => `Max length is ${num}!`;
export const getConfirmDeleteText = (text: string) => `Are you sure want to delete this ${text?.toLowerCase()}`;
export const getToastSuccess = (text: string) => capitalizeStr(`${text?.toLowerCase()} successfully!`);
export const getToastError = (text: string) => capitalizeStr(`${text?.toLowerCase()} failed!`);
export const MSG_VALIDATE_REQUIRED = "Required field";

export const HOSTNAME = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

const detectOS = () => {
	const browser = detect();
	return browser?.os ?? "";
};

const isIOS = () => {
	const os = detectOS();
	return os.toLowerCase().includes("ios");
};
const isAndroid = () => {
	const os = detectOS();
	return os.toLowerCase().includes("android");
};
export const isMobile = isAndroid() || isIOS();
