const {
  createMachine,
  state,
  interpret,
  transition,
  invoke,
} = require("robot3");
const wait = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

const machine = createMachine(
  {
    idle: state(transition("edit", "edit")),
    edit: state(
      transition("cancel", "idle"),
      transition("submit", "loading"),
      transition("input", "edit")
    ),
    loading: invoke(
      () => wait(2000),
      transition("done", "success"),
      transition("error", "edit")
    ),
    success: state(),
  },
  () => ({ title: "hello" })
);

const service = interpret(machine, () => {
  console.log(service.machine.current);
  console.log(service.context);
});

service.send("input");
