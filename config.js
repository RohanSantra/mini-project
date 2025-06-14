import { Client, ID, Databases } from "https://cdn.jsdelivr.net/npm/appwrite@13.0.0/+esm";

// Appwrite config
const APPWRITE_CONFIG = {
    endpoint: "https://fra.cloud.appwrite.io/v1",
    projectId: "684c187b00072846ee5c",
    databaseId: "684c19f4003399532e64",
    collectionId: "684c1a2000351d8ce114"
};

class Config {
    client = new Client();
    database;
    constructor() {
        this.client
            .setEndpoint(APPWRITE_CONFIG.endpoint)
            .setProject(APPWRITE_CONFIG.projectId)
        this.databases = new Databases(this.client);
    }

    // for adding student details
    async AddStudentDetails(data) {
        try {
            const result = await this.databases.createDocument(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.collectionId,
                ID.unique(),
                data
            )
            return result;
        } catch (error) {
            throw error;
        }
    }

    // for getting all student details
    async getStudentDetails() {
        try {
            const result = await this.databases.listDocuments(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.collectionId,
            )
            return result;
        }
        catch (error) {
            throw error;
        }
    }

    // For updating student details
    async updateStudentDetails(studentId, updatedStudentData) {
        try {
            const result = await this.databases.updateDocument(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.collectionId,
                studentId,
                updatedStudentData
            )
            return result;
        } catch (error) {
            throw error
        }
    }

    // for deleting student details
    async deleteStudentDetails(studentId) {
        try {
            const result = await this.databases.deleteDocument(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.collectionId,
                studentId
            );
            return result
        } catch (error) {
            throw error
        }
    }
}

const config = new Config();
export default config;