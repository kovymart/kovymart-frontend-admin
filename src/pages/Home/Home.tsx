import SearchEngine from "./SearchEngine.component"
import TableData from "./TableData.component"
import { useRef } from "react"
import { useReactToPrint } from 'react-to-print'

export function Home() {
	// Handle print pdf <div> Table data </div>
	const componentRef = useRef<any>()
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})

	return (
		<div>
			<SearchEngine
				handlePrint={handlePrint}
			/>
			<div ref={componentRef}>
				<TableData />
			</div>
		</div>
	)
}
