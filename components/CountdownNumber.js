export default function CountdownNumber(props) {
  const bgClass = props.isSecond ? "bg-white" : "bg-white/80";
  const textColor = props.isSecond ? "text-discord-purple" : "text-black";
  const textWeight = props.isSecond ? "font-semibold" : "";
  const marginLeft = props.digitTwo ? "ml-2" : "";

  return (
    <div
      className={`text-4xl ${textColor} ${textWeight} ${bgClass} w-16 h-20 ${marginLeft} rounded-xl grid place-items-center`}
    >
      <div className="">{props.number}</div>
    </div>
  );
}
