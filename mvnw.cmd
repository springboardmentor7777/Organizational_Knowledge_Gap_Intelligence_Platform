@echo off
SETLOCAL EnableExtensions

SET JDK_DIR=%USERPROFILE%\.m2\jdk-21
SET MAVEN_DIR=%USERPROFILE%\.m2\apache-maven-3.9.6
SET MVN_CMD=%MAVEN_DIR%\bin\mvn.cmd

@REM Setup JDK 21 LTS if missing
IF NOT EXIST "%JDK_DIR%\bin\java.exe" (
    echo [OKGIP] Setting up OpenJDK 21 LTS...
    powershell -ExecutionPolicy Bypass -Command "$m2 = '$env:USERPROFILE\.m2'; $zip = '$m2\jdk21.zip'; $dest = '$m2\jdk-21'; if (-not (Test-Path $dest)) { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.4%2B7/OpenJDK21U-jdk_x64_windows_hotspot_21.0.4_7.zip', $zip); $tmp = '$m2\jdk21_tmp'; Expand-Archive -Path $zip -DestinationPath $tmp -Force; $inner = (Get-ChildItem -Path $tmp -Directory | Select-Object -First 1).FullName; Move-Item -Path $inner -Destination $dest -Force; Remove-Item $tmp -Recurse -Force }"
)

@REM Setup Apache Maven 3.9.6 if missing
IF NOT EXIST "%MVN_CMD%" (
    echo [OKGIP] Setting up Apache Maven 3.9.6...
    powershell -ExecutionPolicy Bypass -Command "$m2 = '$env:USERPROFILE\.m2'; $zip = '$m2\apache-maven-3.9.6-bin.zip'; $dest = '$m2\apache-maven-3.9.6'; if (-not (Test-Path $dest)) { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip', $zip); Expand-Archive -Path $zip -DestinationPath $m2 -Force }"
)

SET "JAVA_HOME=%JDK_DIR%"
SET "PATH=%JAVA_HOME%\bin;%PATH%"

IF EXIST "%MVN_CMD%" (
    "%MVN_CMD%" %*
) ELSE (
    echo [OKGIP Error] Failed to launch Maven Wrapper.
    EXIT /B 1
)
