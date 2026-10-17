// ==========================================================================
// QuickNotes App - Core JavaScript
// ==========================================================================

// 1. Select DOM elements using querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

// 2. State management: notes array of objects { id, text, category, createdAt }
let notes = [];
const STORAGE_KEY = 'quicknotes_app_notes';

/**
 * Save notes to localStorage using JSON.stringify
 */
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Load notes from localStorage using JSON.parse
 */
function loadNotes() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedNotes = JSON.parse(savedData);
      if (Array.isArray(parsedNotes)) {
        notes = parsedNotes;
      }
    } catch (err) {
      console.error('Could not parse saved notes from localStorage:', err);
      notes = [];
    }
  } else {
    notes = [];
  }
}

/**
 * Update the note count message with proper pluralization:
 * Handles zero, one, and many notes.
 * @param {number} count 
 */
function updateCount(count) {
  if (count === 0) {
    noteCount.textContent = '0 notes';
  } else if (count === 1) {
    noteCount.textContent = '1 note';
  } else {
    noteCount.textContent = `${count} notes`;
  }
}

/**
 * Display validation error message in #error-message
 * @param {string} msg 
 */
function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.add('active');
}

/**
 * Clear validation error message
 */
function clearError() {
  errorMessage.textContent = '';
  errorMessage.classList.remove('active');
}

/**
 * Rebuild the list from the notes array using createElement and textContent.
 * User-supplied text is NEVER assigned with innerHTML.
 */
function render() {
  // Update count for zero, one, and many notes
  updateCount(notes.length);

  // Clear current list content safely
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }

  if (notes.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-notes-message';
    emptyItem.textContent = 'No notes yet. Add your first note above!';
    notesList.appendChild(emptyItem);
    return;
  }

  notes.forEach((note) => {
    // Card container
    const li = document.createElement('li');
    li.className = `note-card category-${note.category}`;
    li.dataset.id = note.id;

    // Content container
    const contentWrap = document.createElement('div');
    contentWrap.className = 'note-content-wrap';

    // Metadata row (category badge + timestamp)
    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';

    const badge = document.createElement('span');
    badge.className = 'note-category-badge';
    badge.textContent = note.category;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'note-date';
    dateSpan.textContent = note.createdAt;

    metaDiv.appendChild(badge);
    metaDiv.appendChild(dateSpan);

    // Note text element (using textContent for security)
    const textPara = document.createElement('p');
    textPara.className = 'note-text';
    textPara.textContent = note.text;

    contentWrap.appendChild(metaDiv);
    contentWrap.appendChild(textPara);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete note: ${note.text.slice(0, 20)}`);

    deleteBtn.addEventListener('click', () => {
      deleteNote(note.id);
    });

    li.appendChild(contentWrap);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

/**
 * Handle form submission: validate and add note
 * @param {Event} e 
 */
function handleAddNote(e) {
  e.preventDefault();
  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation: empty note check
  if (text.length === 0) {
    showError('Note text cannot be empty. Please enter your note.');
    noteInput.focus();
    return;
  }

  // Validation: over 200 characters check
  if (text.length > 200) {
    showError('Note text cannot exceed 200 characters.');
    noteInput.focus();
    return;
  }

  // Clear errors when validation passes
  clearError();

  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  notes.unshift(newNote);
  saveNotes();
  render();

  noteInput.value = '';
  noteInput.focus();
}

/**
 * Delete a note by its ID
 * @param {string} id 
 */
function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  saveNotes();
  render();
}

// Event Listeners
noteForm.addEventListener('submit', handleAddNote);

noteInput.addEventListener('input', () => {
  if (errorMessage.textContent) {
    if (noteInput.value.trim().length > 0 && noteInput.value.trim().length <= 200) {
      clearError();
    }
  }
});

// Initial boot: load persistent notes then render
loadNotes();
render();
