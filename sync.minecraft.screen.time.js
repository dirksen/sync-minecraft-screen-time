#!/usr/bin/env osascript -l JavaScript

/* The script needs to access external processes or system actions.
 * If these processes/actions are not available, the system throws an exception.
 * This function handles these exceptions gracefully, by returning either null by default,
 * or the result of onErr().
 */
function guardedEval(func, onErr = () => null) {
  try {
    return func();
  } catch (e) {
    return onErr(e);
  }
}

/* Main entry point
 */
function run() {
  const scriptRunner = Application.currentApplication();
  scriptRunner.includeStandardAdditions = true;
  // Shorthand alias to send commands to the shell
  const shell = scriptRunner.doShellScript;
  const sys = Application("System Events");
  sys.includeStandardAdditions = true;
  const dock = sys.applicationProcesses["Dock"];

  // Look for the java process
  const javaStatus = guardedEval(() => shell("ps -eo stat,comm|grep '[j]ava'"));
  // `S` indicates java is running
  const javaRunning = /^S/.test(javaStatus);
  // `T` means suspended
  const javaSuspended = /^T/.test(javaStatus);
  // Check the icon of the Minecraft Launcher icon on the Dock
  const allowedToRun =
    guardedEval(
      () =>
        dock.lists[0].uiElements["Minecraft"].attributes[
          "AXScreenTimeStatus"
        ].value(),
      // If the Launcher has screen time to run, the above evaluation would throw an exception
      // with the error message `Can't get object`.
      // In this case, convert the exception to a normal value.
      (e) => {
        return e.message == "Can't get object." ? "No time limit" : null;
      },
    ) != "Time Limit";

  if (javaRunning && !allowedToRun) {
    // Time's up for the Launcher, give the player a heads-up, then pause the game.
    sys.displayAlert("Times up!", {
      message:
        "Switch back to the Minecraft Launcher app to request more time.",
      as: "warning",
      givingUpAfter: 10,
    });
    shell("killall -STOP java");
  } else if (javaSuspended && allowedToRun) {
    // More time has been approved, reactivate the game.
    shell("killall -CONT java");
  }
}
