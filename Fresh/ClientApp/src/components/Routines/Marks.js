const Reps = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' }
];

const Length = [
    { value: 10, label: '10min' },
    { value: 30, label: '30min' },
    { value: 60, label: '60min' },
];

export default (type) => {
    if (type === 'Reps') { return Reps; }
    return Length;
};
