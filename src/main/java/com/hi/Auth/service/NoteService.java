package com.hi.Auth.service;

import com.hi.Auth.model.Note;
import com.hi.Auth.model.User;
import com.hi.Auth.repository.NoteRepository;
import com.hi.Auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;


    public Note createNote(Note note){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));

        note.setUser(user);
        return noteRepository.save(note);
    }

    public List<Note> getUserNotes(){
        String username=SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));

        return noteRepository.findByUser(user);
    }

    public Note updateNote(Long id, Note noteDetails){
        String username=SecurityContextHolder.getContext().getAuthentication().getName();
        User user =userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));
        Note note=noteRepository.findById(id).orElseThrow(()->new RuntimeException("Note not found"));
        if(!note.getUser().getId().equals(user.getId())){
            throw new RuntimeException("Unauthorized");
        }
        note.setTitle(noteDetails.getTitle());
        note.setDescription(noteDetails.getDescription());
        return noteRepository.save(note);
    }

    public void deleteNote(Long id){
        String username=SecurityContextHolder.getContext().getAuthentication().getName();
        User user =userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));
        Note note=noteRepository.findById(id).orElseThrow(()->new RuntimeException("Note not found"));
        if(!note.getUser().getId().equals(user.getId())){
            throw new RuntimeException("Unauthorized");
        }
        noteRepository.delete(note);
    }
}
