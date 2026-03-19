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
    Insert: (structure, value) => {
      return [{ type: "ll-highlight-head" }, { type: "ll-insert-head", value }];
    },

    Delete: (structure) => {
      return [{ type: "ll-highlight-head" }, { type: "ll-delete-head" }];
    },

    Traverse: (structure) => {
      return structure.map((_, index) => ({
        type: "ll-traverse",
        index,
      }));
    },
  },
};
