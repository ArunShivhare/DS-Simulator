export const codeSnippets = {
  linkedlist: {
    "Insert Head": {
      js: `// Insert at beginning
function insertAtHead(value) {
  let newNode = new Node(value);
  newNode.next = head;
  head = newNode;
}`,
      cpp: `// Insert at beginning
void insertAtHead(int value) {
  Node* newNode = new Node();
  newNode->data = value;
  newNode->next = head;
  head = newNode;
}`,
      Java: `// Insert at beginning
void insertAtHead(int value) {
    Node newNode = new Node(value);
    newNode.next = head;
    head = newNode;
}`,
      Python: `# Insert at beginning
def insert_at_head(value):
    global head
    new_node = Node(value)
    new_node.next = head
    head = new_node`,
    },

    "Insert Tail": {
      js: `// Insert at end
function insertAtTail(value) {
  let newNode = new Node(value);
  if (!head) { head = newNode; return; }
  let temp = head;
  while (temp.next) temp = temp.next;
  temp.next = newNode;
}`,
      cpp: `// Insert at end
void insertAtTail(int value) {
  Node* newNode = new Node();
  newNode->data = value;
  newNode->next = nullptr;
  if (!head) { head = newNode; return; }
  Node* temp = head;
  while (temp->next) temp = temp->next;
  temp->next = newNode;
}`,
      Java: `// Insert at end
void insertAtTail(int value) {
    Node newNode = new Node(value);
    if (head == null) { head = newNode; return; }
    Node temp = head;
    while (temp.next != null) temp = temp.next;
    temp.next = newNode;
}`,
      Python: `# Insert at end
def insert_at_tail(value):
    global head
    new_node = Node(value)
    if not head:
        head = new_node
        return
    temp = head
    while temp.next:
        temp = temp.next
    temp.next = new_node`,
    },

    "Delete Head": {
      js: `// Delete first node
function deleteHead() {
  if (!head) return;
  head = head.next;
}`,
      cpp: `// Delete first node
void deleteHead() {
  if (!head) return;
  Node* temp = head;
  head = head->next;
  delete temp;
}`,
      Java: `// Delete first node
void deleteHead() {
    if (head == null) return;
    head = head.next;
}`,
      Python: `# Delete first node
def delete_head():
    global head
    if not head: return
    head = head.next`,
    },

    "Delete Tail": {
      js: `// Delete last node
function deleteTail() {
  if (!head) return;
  if (!head.next) { head = null; return; }
  let temp = head;
  while (temp.next.next) temp = temp.next;
  temp.next = null;
}`,
      cpp: `// Delete last node
void deleteTail() {
  if (!head) return;
  if (!head->next) { delete head; head = nullptr; return; }
  Node* temp = head;
  while (temp->next->next) temp = temp->next;
  delete temp->next;
  temp->next = nullptr;
}`,
      Java: `// Delete last node
void deleteTail() {
    if (head == null) return;
    if (head.next == null) { head = null; return; }
    Node temp = head;
    while (temp.next.next != null) temp = temp.next;
    temp.next = null;
}`,
      Python: `# Delete last node
def delete_tail():
    global head
    if not head: return
    if not head.next:
        head = None
        return
    temp = head
    while temp.next.next:
        temp = temp.next
    temp.next = None`,
    },

    Traverse: {
      js: `// Traverse
function traverse() {
  let temp = head;
  while (temp) {
    console.log(temp.data);
    temp = temp.next;
  }
}`,
      cpp: `// Traverse
void traverse() {
  Node* temp = head;
  while (temp) {
    cout << temp->data << " ";
    temp = temp->next;
  }
}`,
      Java: `// Traverse
void traverse() {
    Node temp = head;
    while (temp != null) {
        System.out.print(temp.data + " ");
        temp = temp.next;
    }
}`,
      Python: `# Traverse
def traverse():
    temp = head
    while temp:
        print(temp.data)
        temp = temp.next`,
    },

        "Insert at Position": {
      js: `// Insert at specific position (0-indexed)
function insertAtPosition(value, pos) {
  if (pos === 0) { insertAtHead(value); return; }
  let newNode = new Node(value);
  let temp = head;
  for (let i = 0; i < pos - 1 && temp; i++) temp = temp.next;
  if (!temp) return; // Position out of bounds
  newNode.next = temp.next;
  temp.next = newNode;
}`,
      cpp: `// Insert at specific position (0-indexed)
void insertAtPosition(int value, int pos) {
  if (pos == 0) { insertAtHead(value); return; }
  Node* newNode = new Node();
  newNode->data = value;
  Node* temp = head;
  for (int i = 0; i < pos - 1 && temp; i++) temp = temp->next;
  if (!temp) return; // Position out of bounds
  newNode->next = temp->next;
  temp->next = newNode;
}`,
      Java: `// Insert at specific position (0-indexed)
void insertAtPosition(int value, int pos) {
    if (pos == 0) { insertAtHead(value); return; }
    Node newNode = new Node(value);
    Node temp = head;
    for (int i = 0; i < pos - 1 && temp != null; i++) temp = temp.next;
    if (temp == null) return; // Position out of bounds
    newNode.next = temp.next;
    temp.next = newNode;
}`,
      Python: `# Insert at specific position (0-indexed)
def insert_at_position(value, pos):
    global head
    if pos == 0:
        insert_at_head(value)
        return
    new_node = Node(value)
    temp = head
    for i in range(pos - 1):
        if not temp: break
        temp = temp.next
    if not temp: return # Position out of bounds
    new_node.next = temp.next
    temp.next = new_node`,
    },

    "Delete at Position": {
      js: `// Delete at specific position (0-indexed)
function deleteAtPosition(pos) {
  if (!head) return;
  if (pos === 0) { deleteHead(); return; }
  let temp = head;
  for (let i = 0; i < pos - 1 && temp.next; i++) temp = temp.next;
  if (!temp.next) return; // Position out of bounds
  temp.next = temp.next.next;
}`,
      cpp: `// Delete at specific position (0-indexed)
void deleteAtPosition(int pos) {
  if (!head) return;
  if (pos == 0) { deleteHead(); return; }
  Node* temp = head;
  for (int i = 0; i < pos - 1 && temp->next; i++) temp = temp->next;
  if (!temp->next) return; // Position out of bounds
  Node* toDelete = temp->next;
  temp->next = temp->next->next;
  delete toDelete;
}`,
      Java: `// Delete at specific position (0-indexed)
void deleteAtPosition(int pos) {
    if (head == null) return;
    if (pos == 0) { deleteHead(); return; }
    Node temp = head;
    for (int i = 0; i < pos - 1 && temp.next != null; i++) temp = temp.next;
    if (temp.next == null) return; // Position out of bounds
    temp.next = temp.next.next;
}`,
      Python: `# Delete at specific position (0-indexed)
def delete_at_position(pos):
    global head
    if not head: return
    if pos == 0:
        delete_head()
        return
    temp = head
    for i in range(pos - 1):
        if not temp.next: break
        temp = temp.next
    if not temp.next: return # Position out of bounds
    temp.next = temp.next.next`,
    },
  },

  array: {
    Insert: {
      js: `// Push in Array
let arr = [1, 2, 3];
arr.push(4);`,
      cpp: `// Push in Array
vector<int> arr = {1, 2, 3};
arr.push_back(4);`,
      Java: `// Push in Array
ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(1, 2, 3));
arr.add(4);`,
      Python: `# Push in Array
arr = [1, 2, 3]
arr.append(4)`,
    },

    Delete: {
      js: `// Pop from Array
let arr = [1, 2, 3];
arr.pop();`,
      cpp: `// Pop from Array
vector<int> arr = {1, 2, 3};
arr.pop_back();`,
      Java: `// Pop from Array
ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(1, 2, 3));
arr.remove(arr.size() - 1);`,
      Python: `# Pop from Array
arr = [1, 2, 3]
arr.pop()`,
    },

    "Linear Search": {
      js: `// Linear Search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      cpp: `// Linear Search
int linearSearch(vector<int>& arr, int target) {
  for (int i = 0; i < arr.size(); i++) {
    if (arr[i] == target) return i;
  }
  return -1;
}`,
      Java: `// Linear Search
int linearSearch(ArrayList<Integer> arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr.get(i) == target) return i;
    }
    return -1;
}`,
      Python: `# Linear Search
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    },

    "Binary Search": {
      js: `// Binary Search (Sorted Array)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      cpp: `// Binary Search (Sorted Array)
int binarySearch(vector<int>& arr, int target) {
  int left = 0, right = arr.size() - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      Java: `// Binary Search (Sorted Array)
int binarySearch(ArrayList<Integer> arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr.get(mid) == target) return mid;
        if (arr.get(mid) < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      Python: `# Binary Search (Sorted Array)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    },

    "Bubble Sort": {
      js: `// Bubble Sort
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      cpp: `// Bubble Sort
void bubbleSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
      }
    }
  }
}`,
      Java: `// Bubble Sort
void bubbleSort(ArrayList<Integer> arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr.get(j) > arr.get(j + 1)) {
                int temp = arr.get(j);
                arr.set(j, arr.get(j + 1));
                arr.set(j + 1, temp);
            }
        }
    }
}`,
      Python: `# Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    },

    "Quick Sort": {
      js: `// Quick Sort
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      cpp: `// Quick Sort
int partition(vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
  if (low < high) {
    int pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}`,
      Java: `// Quick Sort
int partition(ArrayList<Integer> arr, int low, int high) {
    int pivot = arr.get(high);
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr.get(j) < pivot) {
            i++;
            int temp = arr.get(i);
            arr.set(i, arr.get(j));
            arr.set(j, temp);
        }
    }
    int temp = arr.get(i + 1);
    arr.set(i + 1, arr.get(high));
    arr.set(high, temp);
    return i + 1;
}

void quickSort(ArrayList<Integer> arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}`,
      Python: `# Quick Sort
def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    return arr`,
    },
  },

  stack: {
    Push: {
      js: `// Stack Push
let stack = [];
stack.push(10);`,
      cpp: `// Stack Push
stack<int> st;
st.push(10);`,
      Java: `// Stack Push
Stack<Integer> st = new Stack<>();
st.push(10);`,
      Python: `# Stack Push
stack = []
stack.append(10)`,
    },

    Pop: {
      js: `// Stack Pop
stack.pop();`,
      cpp: `// Stack Pop
st.pop(); // Note: pop() in C++ returns void`,
      Java: `// Stack Pop
st.pop(); // Returns the popped element`,
      Python: `# Stack Pop
stack.pop()`,
    },

    Top: {
      js: `// Stack Top / Peek
let topElement = stack[stack.length - 1];`,
      cpp: `// Stack Top
int topElement = st.top();`,
      Java: `// Stack Peek
int topElement = st.peek();`,
      Python: `# Stack Top / Peek
top_element = stack[-1]`,
    },
  },

  queue: {
    Enqueue: {
      js: `// Enqueue (Add to end)
let queue = [];
queue.push(10);`,
      cpp: `// Enqueue (Add to end)
queue<int> q;
q.push(10);`,
      Java: `// Enqueue (Add to end)
Queue<Integer> q = new LinkedList<>();
q.add(10);`,
      Python: `# Enqueue (Add to end)
from collections import deque
q = deque()
q.append(10)`,
    },

    Dequeue: {
      js: `// Dequeue (Remove from front)
queue.shift();`,
      cpp: `// Dequeue (Remove from front)
q.pop(); // Returns void in C++`,
      Java: `// Dequeue (Remove from front)
q.poll(); // Returns null if empty`,
      Python: `# Dequeue (Remove from front)
q.popleft()`,
    },
  },
};
