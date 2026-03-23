export const visualizationSteps = {
  array: {
    Insert: (structure, value) => {
      return [
        { type: "highlight", index: structure.length },
        { type: "insert", value },
      ];
    },

    Delete: (structure) => {
      return [
        { type: "highlight", index: structure.length - 1 },
        { type: "delete" },
      ];
    },

    "Linear Search": (structure, value) => {
      const steps = [];

      for (let i = 0; i < structure.length; i++) {
        steps.push({ type: "search-check", index: i });

        if (structure[i] === Number(value)) {
          steps.push({ type: "search-found", index: i });
          return steps;
        }
      }

      steps.push({ type: "search-not-found" });
      return steps;
    },

    "Binary Search": (structure, value) => {
      const arr = [...structure].sort((a, b) => a - b); // ensure sorted
      const steps = [];

      let l = 0;
      let h = arr.length - 1;

      while (l <= h) {
        let m = Math.floor((l + h) / 2);

        steps.push({
          type: "bs-check",
          low: l,
          high: h,
          mid: m,
          value: arr[m],
        });

        if (arr[m] === Number(value)) {
          steps.push({ type: "bs-found", index: m });
          return steps;
        }

        if (arr[m] < value) {
          l = m + 1;
        } else {
          h = m - 1;
        }
      }

      steps.push({ type: "bs-not-found" });
      return steps;
    },
  },

  stack: {
    Push: (structure, value) => [{ type: "push", value }],

    Pop: (structure) => [{ type: "pop" }],

    Top: (structure) => {
      if (structure.length === 0) return [];

      return [{ type: "highlightTop" }];
    },
  },

  queue: {
    Enqueue: (structure, value) => [{ type: "enqueue", value }],

    Dequeue: (structure) => [{ type: "dequeue" }],
  },

  linkedlist: {
    "Insert Head": (structure, value) => [{ type: "ll-insert-head", value }],

    "Insert Tail": (structure, value) => [{ type: "ll-insert-tail", value }],

    "Delete Head": (structure) => [{ type: "ll-delete-head" }],

    "Delete Tail": (structure) => [{ type: "ll-delete-tail" }],

    Traverse: (structure) =>
      structure.map((_, index) => ({
        type: "ll-traverse",
        index,
      })),
  },
};
