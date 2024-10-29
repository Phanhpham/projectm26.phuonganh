<template>
    <div class="m-5">
        <!-- Form sửa sản phẩm chỉ hiển thị khi có sản phẩm được chọn để chỉnh sửa -->
        <div v-if="selectedProduct" class="bg-white p-5 rounded-lg mb-5">
            <h2 class="font-bold text-[20px] mb-4">Edit Product</h2>
            <form @submit.prevent="updateProduct" class="mb-5">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Product Name</label>
                    <input
                        type="text"
                        v-model="selectedProduct.name"
                        id="name"
                        placeholder="Enter product name"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="image">Product Image</label>
                    <input
                        type="text"
                        v-model="selectedProduct.image"
                        id="image"
                        placeholder="Enter image URL"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Price</label>
                    <input
                        type="number"
                        v-model="selectedProduct.price"
                        id="price"
                        placeholder="Enter product price"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="category">Category</label>
                    <input
                        type="text"
                        v-model="selectedProduct.category"
                        id="category"
                        placeholder="Enter product category"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Product
                </button>
                <button
                    type="button"
                    @click="cancelEdit"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                    Cancel
                </button>
            </form>
        </div>

        <!-- Danh sách sản phẩm -->
        <div class="bg-white p-5 rounded-lg h-screen">
            <h1 class="font-bold text-[20px]">Manager Product</h1>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">STT</th>
                            <th scope="col" class="px-6 py-3">Product Name</th>
                            <th scope="col" class="px-6 py-3">Image</th>
                            <th scope="col" class="px-6 py-3">Price</th>
                            <th scope="col" class="px-6 py-3">Category</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(product, index) in products"
                            :key="product.id"
                            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ index + 1 }}
                            </th>
                            <td class="px-6 py-4">{{ product.name }}</td>
                            <td class="px-6 py-4">
                                <img class="w-10" :src="product.image" :alt="product.name" />
                            </td>
                            <td class="px-6 py-4">{{ product.price }}</td>
                            <td class="px-6 py-4">{{ product.category }}</td>
                            <td class="px-6 py-4 flex gap-3">
                                <a href="#" @click.prevent="editProduct(product)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                <a href="#" @click.prevent="deleteProduct(product.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>



<script setup>
import { ref } from 'vue';


// Danh sách sản phẩm
const products = ref([
  { id: 1, name: 'Cat Food', category: 'Cats', price: 25000, image: 'https://i.pinimg.com/enabled_lo/564x/0e/41/9e/0e419e1a2ce297150371a4c885973475.jpg' },
  { id: 2, name: 'Dog Food', category: 'Dogs', price: 12000, image: 'https://i.pinimg.com/enabled_lo/564x/06/91/3e/06913e7d0b2c9fff86c8e71f1ba1dbcf.jpg' },
  { id: 3, name: 'Dog Toy', category: 'Dogs', price: 30000, image: 'https://i.pinimg.com/enabled_lo/564x/32/dc/5a/32dc5ae68be64ae4ed325a04208e3aed.jpg' },
  { id: 4, name: 'Fish Tank', category: 'Fish', price: 500000, image: 'https://i.pinimg.com/564x/15/8f/39/158f39d0d7b72d91da4c33c923e44410.jpg' },
]);

// Sản phẩm được chọn để chỉnh sửa
const selectedProduct = ref(null);

// Hàm bắt đầu chỉnh sửa sản phẩm
const editProduct = (product) => {
  selectedProduct.value = { ...product };
};

// Hàm cập nhật sản phẩm sau khi chỉnh sửa
const updateProduct = () => {
  const index = products.value.findIndex(p => p.id === selectedProduct.value.id);
  if (index !== -1) {
    products.value[index] = { ...selectedProduct.value };
  }
  cancelEdit(); // Hủy chế độ chỉnh sửa sau khi cập nhật
};

// Hàm hủy bỏ chỉnh sửa
const cancelEdit = () => {
  selectedProduct.value = null;
};

// Hàm xóa sản phẩm
const deleteProduct = (id) => {
  products.value = products.value.filter(product => product.id !== id);
};


</script>



<style></style>
