package com.hoaxify.hoaxify;

import com.hoaxify.hoaxify.shared.GenericResponse;
import com.hoaxify.hoaxify.user.User;
import com.hoaxify.hoaxify.user.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    public static final String API_1_0_USERS = "/api/1.0/users";

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    UserRepository userRepository;
    
    private User getUser() {
        User user = new User();
        user.setUserName("user12");
        user.setDisplayName("user-test");
        user.setPassword("P4ssword");
        return user;
    }

    @Before
    public void cleanup(){
        userRepository.deleteAll();
    }
    
    @Test
    public void postUser_whenUserIsValid_returnOk(){
        User user = getUser();
        ResponseEntity<Object> objectResponseEntity = testRestTemplate.postForEntity(API_1_0_USERS, user, Object.class);
        assertThat(objectResponseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postUser_whenUserIsValid_returnMessage(){
        User user = getUser();
        ResponseEntity<GenericResponse> response = testRestTemplate.postForEntity(API_1_0_USERS, user, GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }
    
    @Test
    public void postUser_whenUserIsValid_persistRecord(){
        User user = getUser();
        testRestTemplate.postForEntity(API_1_0_USERS, user, Object.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }
    @Test
    public void postUser_whenUserIsValid_passwordIsHashed(){
        User user = getUser();
        testRestTemplate.postForEntity(API_1_0_USERS, user, Object.class);
        List<User> allUsers = userRepository.findAll();
        assertThat(allUsers.get(0).getPassword()).isNotEqualTo(user.getPassword());


    }
}
