export default function chatMessagesHeightCalculator(root, headbar, input) {
  let rootHeight = root.value.clientHeight
  let headbarHeight = headbar.value.$el.clientHeight
  let inputHeight = input.value.$el.clientHeight
  let messagesHeight = rootHeight - headbarHeight - inputHeight

  return messagesHeight
}
