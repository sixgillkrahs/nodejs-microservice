const searchAddress = async (query: string) => {
  if (!query) return;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi tìm địa chỉ:", error);
  }
};

export { searchAddress };
