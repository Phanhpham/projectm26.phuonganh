<template>
    <div class="m-5">
      <div class="bg-white p-5 rounded-lg h-screen">
        <h1 class="font-bold text-[20px]">Categories</h1>
  
        <!-- Search bar for categories --->
        <div class="mt-4">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by category name"
            class="border p-2 rounded w-full"
          />
        </div>
  
        <!-- Add Category Button -->
        <div class="my-4">
          <button
            @click="openAddModal"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
  
        <!-- Categories Table -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">ID</th>
                <th scope="col" class="px-6 py-3">Category Name</th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="category in filteredCategories"
                :key="category.id"
                class="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700"
              >
                <td class="px-6 py-4">{{ category.id }}</td>
                <td class="px-6 py-4">{{ category.name }}</td>
                <td class="px-6 py-4 flex gap-2">
                  <!-- Edit Button -->
                  <button
                    @click="openEditModal(category)"
                    class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <!-- Delete Button -->
                  <button
                    @click="deleteCategory(category.id)"
                    class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Add Category Modal -->
        <div v-if="showAddModal" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div class="bg-white p-5 rounded">
            <h2 class="font-bold text-xl mb-4">Add Category</h2>
            <input
              v-model="newCategoryName"
              placeholder="Category Name"
              class="border p-2 rounded w-full mb-4"
            />
            <button
              @click="addCategory"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              @click="closeModal"
              class="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
  
        <!-- Edit Category Modal -->
        <div v-if="showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div class="bg-white p-5 rounded">
            <h2 class="font-bold text-xl mb-4">Edit Category</h2>
            <input
              v-model="editedCategoryName"
              placeholder="Category Name"
              class="border p-2 rounded w-full mb-4"
            />
            <button
              @click="saveEditedCategory"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              @click="closeModal"
              class="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  // Sample categories data
  const categories = ref([
    { id: 1, name: "Dogs" },
    { id: 2, name: "Cats" },
    { id: 3, name: "Birds" },
    { id: 4, name: "Fish" }
  ]);
  
  // Search query
  const searchQuery = ref("");
  
  // State for Add/Edit Modals
  const showAddModal = ref(false);
  const showEditModal = ref(false);
  const newCategoryName = ref("");
  const editedCategoryName = ref("");
  const currentCategory = ref(null);
  
  // Filtered categories based on search query
  const filteredCategories = computed(() => {
    if (searchQuery.value) {
      return categories.value.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    return categories.value;
  });
  
  // Open Add Modal
  const openAddModal = () => {
    showAddModal.value = true;
  };
  
  // Open Edit Modal
  const openEditModal = (category) => {
    currentCategory.value = category;
    editedCategoryName.value = category.name;
    showEditModal.value = true;
  };
  
  // Close Modals
  const closeModal = () => {
    showAddModal.value = false;
    showEditModal.value = false;
    newCategoryName.value = "";
    editedCategoryName.value = "";
  };
  
  // Add new category
  const addCategory = () => {
    if (newCategoryName.value.trim() !== "") {
      const newId = categories.value.length + 1;
      categories.value.push({ id: newId, name: newCategoryName.value });
      closeModal();
    }
  };
  
  // Save edited category
  const saveEditedCategory = () => {
    if (editedCategoryName.value.trim() !== "") {
      currentCategory.value.name = editedCategoryName.value;
      closeModal();
    }
  };
  
  // Delete category
  const deleteCategory = (id) => {
    categories.value = categories.value.filter((category) => category.id !== id);
  };
  </script>
  
  <style scoped>
  /* Add your custom styles if needed */
  </style>
  