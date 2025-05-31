import { PieChart, Pie, Cell } from "recharts";

const RadialScore = ({ score }: { score: number }) => {
	const data = [
		{
			name: "Score",
			value: score,
			fill: `hsl(${(score / 100) * 120}, 70%, 40%)`,
		},
		{ name: "Remaining", value: 100 - score, fill: "#e7e0eb" },
	];

	return (
		<div className="w-full h-40 flex items-center justify-center relative">
			<PieChart width={160} height={160}>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					startAngle={90}
					endAngle={-270}
					innerRadius={55}
					outerRadius={70}
					paddingAngle={0}
					dataKey="value"
					stroke="none"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.fill} />
					))}
				</Pie>
			</PieChart>
			<div className="absolute text-lg font-bold select-none">
				{Math.round(score * 100) / 100}%
			</div>
		</div>
	);
};

export default RadialScore;
