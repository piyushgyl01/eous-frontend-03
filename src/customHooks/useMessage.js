import { useSelector } from "react-redux";

export default function useMessage() {
  const message = useSelector((state) => state.products.message);

  return message;
}
