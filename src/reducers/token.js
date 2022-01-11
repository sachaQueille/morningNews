export default function (token = "", action) {
  if (action.type === "add-token") {
    return action.data;
  } else {
    return token;
  }
}
