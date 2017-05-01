package com.netcracker.store.logic.test;

import com.netcracker.store.logic.config.ServiceConfig;
import com.netcracker.store.persistence.entity.User;
import com.netcracker.store.logic.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * Created by A-one on 23.04.2017.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ServiceConfig.class)
@Rollback
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void testGetUserByEmail() {
        User user = userService.getUserByEmail("a@a.a");
        assertNotNull(user);
    }

    @Test
    public void testAddAndDeleteUser() {
        User user = new User("t", "t", "t", "t", "t", "t");
        userService.addUser(user);
        assertNotNull(user.getId());
        userService.deleteUser(user);
        assertNull(userService.getUserByEmail("t"));
    }

    @Test
    public void testGetAllUsers() {
        assertNotNull(userService.getAllUsers());
    }
}