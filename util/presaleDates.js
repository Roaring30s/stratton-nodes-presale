export default function getPresaleDateStrings() {
  const presaleStartDate = new Date(process.env.presaleStart);
  const presaleEndDate = new Date(process.env.presaleEnd);

  const presaleStartDateString = presaleStartDate
    .toDateString()
    .split(" ")
    .slice(1)
    .join(" ");
  const presaleStartTimeString = presaleStartDate.toTimeString().split(" ")[0];

  const presaleEndDateString = presaleEndDate
    .toDateString()
    .split(" ")
    .slice(1)
    .join(" ");
  const presaleEndTimeString = presaleEndDate.toTimeString().split(" ")[0];

  const presaleStart = `${presaleStartDateString} ${presaleStartTimeString} GMT`;
  const presaleEnd = `${presaleEndDateString} ${presaleEndTimeString} GMT`;

  return [presaleStart, presaleEnd];
}
