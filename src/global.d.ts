declare module '*.module.scss' {
	interface IClassNames {
		[className: string]: string
	}
	const classNames: IClassNames
	export = classNames
}

declare module  '*.png';
declare module  '*.jpg';
declare module  '*.jpeg';
declare module "*.svg" {
	import {SVGProps, VFC} from 'react'
	const SVG: VFC<SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare const __PLATFORM__ : "mobile" | "desktop";