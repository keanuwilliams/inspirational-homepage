import { selectGoals } from "./goalsSlice";
import { useSelector } from "react-redux";

export default function Goals() {
  const goals = useSelector(selectGoals);

  return (
    <section>
      {Object.values(goals).map((goal) => (
        <p>{goal.name}</p>
      ))}
    </section>
  );
}