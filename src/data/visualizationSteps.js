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

    "Bubble Sort": (structure) => {
      const arr = [...structure];
      const steps = [];
      const n = arr.length;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          // 🔍 Step 1: Compare two elements
          steps.push({
            type: "compare",
            indices: [j, j + 1],
          });

          // 🔁 Step 2: Swap if needed
          if (arr[j] > arr[j + 1]) {
            steps.push({
              type: "swap",
              indices: [j, j + 1],
            });

            // actual swap in temp array
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }

        // ✅ Step 3: Mark last element as sorted
        steps.push({
          type: "mark-sorted",
          index: n - i - 1,
        });

        // 🎯 Step 4: Pass complete
        steps.push({
          type: "pass-complete",
          pass: i + 1,
        });
      }

      // 🟢 First element also sorted at end
      steps.push({
        type: "mark-sorted",
        index: 0,
      });

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
