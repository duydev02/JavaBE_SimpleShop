package com.minhduy;

import java.security.Security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class J6StoreApplication {

	public static void main(String[] args) {
		Security.setProperty("jdk.tls.disabledAlgorithms",
				"SSLv3, RC4, DES, MD5withRSA, DH keySize < 1024,EC keySize < 224, 3DES_EDE_CBC, anon, NULL");
		SpringApplication.run(J6StoreApplication.class, args);
	}

}
