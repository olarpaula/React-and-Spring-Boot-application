package com.poosh.app.service.impl;

import com.poosh.app.dto.CredentialsDto;
import com.poosh.app.dto.LoginSuccessDto;
import com.poosh.app.dto.RecoverPasswordDto;
import com.poosh.app.exceptions.ApiExceptionResponse;
import com.poosh.app.model.User;
import com.poosh.app.model.UserAuth;
import com.poosh.app.repository.UserAuthRepository;
import com.poosh.app.repository.UserRepository;
import com.poosh.app.service.SendEmailService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.FileNotFoundException;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;

@Service
@EnableScheduling
public class SendEmailServiceImpl implements SendEmailService {

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;

    public SendEmailServiceImpl(JavaMailSender javaMailSender, UserRepository userRepository) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
    }

    @Override
    public RecoverPasswordDto sendEmail(String emailTo) throws ApiExceptionResponse {

        User user = userRepository.findFirstByEmail(emailTo);

        if(user==null) {
            throw ApiExceptionResponse.builder().errors(Collections.singletonList("Bad credentials"))
                    .message("User not found").status(HttpStatus.NOT_FOUND).build();
        }

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("olarpaula1999@gmail.com");
        simpleMailMessage.setTo(emailTo);
        simpleMailMessage.setSubject("Poosh Recover Account Password");

        int rndCode = ThreadLocalRandom.current().nextInt(1000, 9999 + 1);
        String body = "Enter recovery code " + rndCode + " to retrieve your account.";

        simpleMailMessage.setText(body);
        javaMailSender.send(simpleMailMessage);

        RecoverPasswordDto response = RecoverPasswordDto.builder().email(user.getEmail()).givenCode(rndCode).build();

        //System.out.println(response.getEmail());
        //System.out.println(response.getGivenCode());

        return response;
    }

    @Scheduled(cron = "0 */1 * * * *")
    public void scheduleTaskUsingCronExpression() throws MessagingException {

        List<User> users = (List<User>) userRepository.findAll();

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setSubject("Fresh Poosh News!");
        helper.setFrom("olarpaula1999@gmail.com");

        for(int i=0; i<users.size(); i++) {
            if(users.get(i).getIsSubscribed() == 1) {

                LocalDateTime now = LocalDateTime.now();
                int no = now.getMinute()%3;

                String textPath = "C:\\Users\\Paula\\Desktop\\poosh app\\app\\src\\main\\java\\com\\poosh\\app\\resources\\texts\\txt" + no + ".txt";
                String body = "";
                try {
                    File myObj = new File(textPath);
                    Scanner myReader = new Scanner(myObj);
                    while (myReader.hasNextLine()) {
                        String data = myReader.nextLine();
                        body += data + "\n";
                    }
                    myReader.close();
                } catch (FileNotFoundException e) {
                    System.out.println("An error occurred.");
                    e.printStackTrace();
                }

                helper.setText(body);

                String imagePath = "C:\\Users\\Paula\\Desktop\\poosh app\\app\\src\\main\\java\\com\\poosh\\app\\resources\\images\\image" + no + ".png";
                FileSystemResource resource = new FileSystemResource(new File(imagePath));
                helper.addInline("image", resource);

                helper.setTo(users.get(i).getEmail());
                javaMailSender.send(message);

            }
        }

    }
}
