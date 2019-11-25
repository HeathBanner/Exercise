
export const dateTemplate = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const subLog = {
    Reps: null,
    Length: null
};

export const routineTemplate = {
    PushUps: { ...subLog },
    BenchPress: { ...subLog },
    PullUps: { ...subLog },
    BentOverRow: { ...subLog },
    ShoulderPress: { ...subLog },
    DeadLift: { ...subLog },
    BackSquat: { ...subLog },
    WalkingLunge: { ...subLog },
    FrontPlank: { ...subLog },
    SeatedHamstringCurl: { ...subLog },
};