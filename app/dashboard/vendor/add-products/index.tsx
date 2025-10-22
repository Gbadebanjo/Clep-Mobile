"use client"

import { useState } from "react"
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const AddProductScreen = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    originalPrice: "",
    salePrice: "",
    stock: "",
    lowStockThreshold: "",
    keywords: "",
    status: "Draft",
    seoTitle: "",
  })

  const [errors, setErrors] = useState({})
  const [attributes, setAttributes] = useState([
    { label: "Color", value: "Red" },
    { label: "Size", value: "Medium" },
    { label: "Material", value: "Cotton" },
  ])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Product description is required"
    }
    if (!formData.category) {
      newErrors.category = "At least one category is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateProduct = () => {
    if (validateForm()) {
      Alert.alert("Success", "Product created successfully!")
      console.log("Form Data:", formData)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>VAZZEL</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* General Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Information</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={[styles.input, errors.productName && styles.inputError]}
              placeholder="Type product name here..."
              placeholderTextColor="#999"
              value={formData.productName}
              onChangeText={(value) => handleInputChange("productName", value)}
            />
            {errors.productName && <Text style={styles.errorText}>{errors.productName}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea, errors.description && styles.inputError]}
              placeholder="Type product description here..."
              placeholderTextColor="#999"
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              multiline
              numberOfLines={4}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Product Category</Text>
            <TouchableOpacity
              style={[styles.dropdown, errors.category && styles.inputError]}
              onPress={() => Alert.alert("Select Category", "Category selection would open a picker")}
            >
              <Text style={styles.dropdownText}>{formData.category || "Select a category"}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
          </View>
        </View>

        {/* Pricing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Original Price</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={formData.originalPrice}
              onChangeText={(value) => handleInputChange("originalPrice", value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Sale Price (Last Price)</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={formData.salePrice}
              onChangeText={(value) => handleInputChange("salePrice", value)}
            />
          </View>
        </View>

        {/* Inventory Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inventory</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Stock (Quantity)</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={formData.stock}
              onChangeText={(value) => handleInputChange("stock", value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Low Stock Threshold</Text>
            <TextInput
              style={styles.input}
              placeholder="5"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={formData.lowStockThreshold}
              onChangeText={(value) => handleInputChange("lowStockThreshold", value)}
            />
          </View>
        </View>

        {/* Product Variation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Variation</Text>
          <Text style={styles.sectionDescription}>Add details like different sizes, colors, or materials</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="e.g. Large, Red, Cotton" placeholderTextColor="#999" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>SKU (auto-generated)</Text>
            <Text style={styles.helperText}>Will be generated</Text>
          </View>
        </View>

        {/* Attributes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attributes</Text>

          {attributes.length > 0 ? (
            <View style={styles.attributesList}>
              {attributes.map((attr, index) => (
                <Text key={index} style={styles.attributeItem}>
                  {attr.label}: <Text style={styles.attributeValue}>{attr.value}</Text>
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.noAttributesText}>No attributes added</Text>
          )}

          <TouchableOpacity style={styles.addAttributeButton}>
            <Text style={styles.addAttributeText}>+ Add Attribute</Text>
          </TouchableOpacity>
        </View>

        {/* SEO Keywords Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SEO Keywords</Text>
          <Text style={styles.sectionDescription}>Add keywords to help customers find your product</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Keywords (comma separated)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add relevant keywords separated by commas"
              placeholderTextColor="#999"
              value={formData.keywords}
              onChangeText={(value) => handleInputChange("keywords", value)}
              multiline
              numberOfLines={3}
            />
            <Text style={styles.helperText}>Add relevant keywords separated by commas</Text>
          </View>
        </View>

        {/* Status Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <Text style={styles.sectionDescription}>Set the status of your product</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Status</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => Alert.alert("Select Status", "Status options: Draft, Published")}
            >
              <Text style={styles.dropdownText}>{formData.status}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SEO Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SEO Settings</Text>
          <Text style={styles.sectionDescription}>Optimize your product for search engines</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>SEO Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Vazzel product from NIN verify"
              placeholderTextColor="#999"
              value={formData.seoTitle}
              onChangeText={(value) => handleInputChange("seoTitle", value)}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.previewButton}>
            <Text style={styles.previewButtonText}>👁 Preview</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateProduct}>
            <Text style={styles.createButtonText}>Create Product</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: "#000",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  dropdownText: {
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#999",
  },
  helperText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  attributesList: {
    marginBottom: 12,
  },
  attributeItem: {
    fontSize: 14,
    color: "#d91e63",
    marginBottom: 6,
  },
  attributeValue: {
    color: "#d91e63",
    fontWeight: "500",
  },
  noAttributesText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
    marginBottom: 12,
  },
  addAttributeButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  addAttributeText: {
    fontSize: 14,
    color: "#d91e63",
    fontWeight: "500",
  },
  actionButtons: {
    marginHorizontal: 12,
    marginVertical: 16,
    gap: 12,
  },
  previewButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  previewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  createButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#d91e63",
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  spacer: {
    height: 20,
  },
})

export default AddProductScreen
