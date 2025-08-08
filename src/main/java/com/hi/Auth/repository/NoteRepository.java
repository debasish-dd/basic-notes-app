package com.hi.Auth.repository;

import com.hi.Auth.model.Note;
import com.hi.Auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note,Long> {
    List<Note> findByUser(User user);
}
