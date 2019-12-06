
export const dateTemplate = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const subLog = {
    Reps: null,
    Length: null
};

export const routineTemplate = {
    pushUps: { ...subLog },
    benchPress: { ...subLog },
    pullUp: { ...subLog },
    bentOverRow: { ...subLog },
    shoulderPress: { ...subLog },
    deadLift: { ...subLog },
    backSquat: { ...subLog },
    walkingLunge: { ...subLog },
    frontPlank: { ...subLog },
    seatedHamstringCurl: { ...subLog },
};