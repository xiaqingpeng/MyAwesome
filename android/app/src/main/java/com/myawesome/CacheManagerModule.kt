package com.myawesome

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.myawesome.specs.NativeCacheManagerSpec
import java.io.File

class CacheManagerModule(reactContext: ReactApplicationContext) :
    NativeCacheManagerSpec(reactContext) {

    companion object {
        const val NAME = "CacheManager"
    }

    override fun getName(): String = NAME

    override fun getCacheSize(promise: Promise) {
        try {
            promise.resolve(getCacheDirectories().sumOf { directorySize(it) }.toDouble())
        } catch (e: Exception) {
            promise.reject("CACHE_SIZE_ERROR", "Failed to get cache size", e)
        }
    }

    override fun clearCache(promise: Promise) {
        try {
            getCacheDirectories().forEach { clearDirectory(it) }
            promise.resolve(getCacheDirectories().sumOf { directorySize(it) }.toDouble())
        } catch (e: Exception) {
            promise.reject("CACHE_CLEAR_ERROR", "Failed to clear cache", e)
        }
    }

    private fun getCacheDirectories(): List<File> {
        return listOfNotNull(
            reactApplicationContext.cacheDir,
            reactApplicationContext.codeCacheDir,
            reactApplicationContext.externalCacheDir
        ).distinctBy { it.absolutePath }
    }

    private fun directorySize(file: File?): Long {
        if (file == null || !file.exists()) {
            return 0L
        }

        if (file.isFile) {
            return file.length()
        }

        return file.listFiles()?.sumOf { directorySize(it) } ?: 0L
    }

    private fun clearDirectory(directory: File?) {
        if (directory == null || !directory.exists() || !directory.isDirectory) {
            return
        }

        directory.listFiles()?.forEach { file ->
            file.deleteRecursively()
        }
    }
}
